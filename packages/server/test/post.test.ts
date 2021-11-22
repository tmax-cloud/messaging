import axios, { AxiosRequestConfig } from 'axios'
import _ from 'lodash'

import { PostService } from '../src/post/service'

jest.mock('@botpress/messaging-engine')
jest.mock('axios')

describe('PostService', () => {
  const defaultEnv = process.env
  let data: any
  let axiosConfig: AxiosRequestConfig
  let headers: { [name: string]: string }

  const url = 'https://best.messaging.org'
  const password = 'asuperpassword'

  beforeEach(async () => {
    process.env = { ..._.cloneDeep(process.env) }

    data = { some: 'data' }
    axiosConfig = { headers: {} }
    headers = { custom: 'header' }
  })

  afterEach(() => {
    process.env = defaultEnv
  })

  test('Should not throw any error with a default configuration', async () => {
    try {
      const postService = new PostService()
      await postService.setup()

      expect(postService['logger']).not.toBeUndefined()
      expect(postService['password']).toBeUndefined()
    } catch (e) {
      fail(e)
    }
  })

  describe('send', () => {
    test('Should call a URL making a post request', async () => {
      data = undefined

      const spy = jest.spyOn(axios, 'post')

      const postService = new PostService()
      await postService.setup()

      await postService.send(url, data)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(url, data, axiosConfig)
    })

    test('Should send data to a URL making a post request', async () => {
      const spy = jest.spyOn(axios, 'post')

      const postService = new PostService()
      await postService.setup()

      await postService.send(url, data)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(url, data, axiosConfig)
    })

    test('Should send data to a URL making a post request and using custom headers', async () => {
      axiosConfig.headers = headers

      const spy = jest.spyOn(axios, 'post')

      const postService = new PostService()
      await postService.setup()

      await postService.send(url, data, headers)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(url, data, axiosConfig)
    })

    test('Should send data to a URL making a post request, using custom headers and a password from an env var', async () => {
      const env = _.cloneDeep(process.env)
      process.env.INTERNAL_PASSWORD = password

      axiosConfig.headers = { ...headers, password }

      const spy = jest.spyOn(axios, 'post')

      const postService = new PostService()
      await postService.setup()

      await postService.send(url, data, headers)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(url, data, axiosConfig)

      process.env = env
    })

    test('Should log the error if the request fails', async () => {
      const error = new Error('error')
      const spy = jest.spyOn(axios, 'post').mockImplementationOnce(() => Promise.reject(error))

      const postService = new PostService()
      await postService.setup()
      Object.defineProperty(postService, 'attempts', {
        value: 1,
        writable: false
      })

      const loggerSpy = jest.spyOn(postService['logger'], 'warn')

      await postService.send(url, data)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(url, data, axiosConfig)
      expect(loggerSpy).toBeCalledTimes(1)
    })

    describe('destroy', () => {
      test('Should prevent backoff from ever retrying the request', async () => {
        const error = new Error('error')
        const spy = jest.spyOn(axios, 'post').mockImplementationOnce(() => Promise.reject(error))

        const postService = new PostService()
        await postService.setup()
        Object.defineProperty(postService, 'attempts', {
          value: 10,
          writable: false
        })

        const loggerSpy = jest.spyOn(postService['logger'], 'warn')

        await postService.destroy()
        await postService.send(url, data)

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(url, data, axiosConfig)
        expect(loggerSpy).toBeCalledTimes(1)
      })
    })
  })
})
