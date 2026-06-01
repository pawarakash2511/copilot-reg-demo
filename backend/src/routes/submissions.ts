import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { insertSubmission } from '../services/dbService'
import { sendSubmissionEmail } from '../services/emailService'

const router = Router()

const validationRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name must be 100 characters or fewer'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('A valid email address is required')
    .normalizeEmail()
    .isLength({ max: 200 }).withMessage('Email must be 200 characters or fewer'),
  body('occupation')
    .trim()
    .notEmpty().withMessage('Occupation is required')
    .isLength({ max: 100 }).withMessage('Occupation must be 100 characters or fewer'),
]

router.post('/', validationRules, async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      emailSent: false,
    })
    return
  }

  const { name, email, occupation } = req.body as {
    name: string
    email: string
    occupation: string
  }

  let submission
  try {
    submission = insertSubmission({ name, email, occupation })
  } catch (err) {
    console.error('[DB] Insert failed:', err)
    res.status(500).json({
      success: false,
      message: 'Failed to save your submission. Please try again.',
      emailSent: false,
    })
    return
  }

  let emailSent = false
  try {
    await sendSubmissionEmail(submission)
    emailSent = true
  } catch (err) {
    console.error('[Email] Send failed:', err)
  }

  res.status(201).json({
    success: true,
    message: 'Thank you! Your registration has been received.',
    emailSent,
  })
})

export default router
