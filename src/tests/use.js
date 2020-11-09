import pagarme from 'pagarme'
import cleanDeep from 'clean-deep'

import { useEffect, useState } from 'react'
import tests from './index'
import schemas from '../schemas'

export default apiKey => {
  const [test, setTest] = useState(null)
  const [schema, setSchema] = useState(null)
  const [fakers, setFakers] = useState(null)
  const [formData, setFormData] = useState({})
  const [requestData, setRequestData] = useState(null)
  const [responseData, setResponseData] = useState(null)
  const [responseStatus, setResponseStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [pagarmeClient, setPagarmeClient] = useState(null)

  const setupTest = async () => {
    if (test && apiKey) {
      setFormData(null)
      setRequestData(null)
      setResponseData(null)
      setResponseStatus(null)
      setLoading(true)

      const setup = await test.setup(schemas, pagarmeClient)

      setSchema(setup.schema)
      setFakers(setup.fakers)

      setLoading(false)
    }
  }

  useEffect(() => setupTest(), [test])

  useEffect(() => {
    const startPagarmeClient = async () => {
      if (apiKey) {
        setPagarmeClient(await pagarme.client.connect({ api_key: apiKey }))
      }
    }

    startPagarmeClient()
  }, [apiKey])

  const executeTest = async () => {
    try {
      const data = await test.execute(requestData, pagarmeClient)

      setResponseData(data)
      setResponseStatus({ success: true })
    } catch (error) {
      setResponseData(error.response)
      setResponseStatus({ success: false })
    }
  }

  const prepareTest = async formData => {
    const requestData = cleanDeep(await test.prepare(formData, pagarmeClient))


    setFormData(formData)
    setRequestData(requestData)
  }

  return {
    useTest: () => ({ test, setTest, executeTest, prepareTest }),
    tests,
    schema,
    fakers,
    useFormData: () => ({ formData, setFormData }),
    requestData,
    responseData,
    responseStatus,
    loading
  }
}
