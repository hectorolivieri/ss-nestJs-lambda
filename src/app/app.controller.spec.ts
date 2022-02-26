import { Test, TestingModule } from '@nestjs/testing'

import { MainController } from './app.controller'

describe('MainController', () => {
  let mainController: MainController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainController],
      providers: [],
    }).compile()

    mainController = await module.resolve(MainController)
  })

  describe('root', () => {
    it('Health check should return "OK"', () => {
      expect(mainController.getHealthCheck()).toBe('OK')
    })
  })
})
