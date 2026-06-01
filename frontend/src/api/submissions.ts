import axios from 'axios'

export interface SubmissionPayload {
  name: string
  email: string
  occupation: string
}

export interface SubmissionResponse {
  success: boolean
  message: string
  emailSent: boolean
}

export async function submitRegistration(
  data: SubmissionPayload
): Promise<SubmissionResponse> {
  const response = await axios.post<SubmissionResponse>('/api/submissions', data)
  return response.data
}
