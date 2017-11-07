const supertest = require('supertest')
const chai = require('chai')
const app = require('../../src/app')
const models = require('../../src/models')

global.app = app
global.request = supertest(app)
global.expect = chai.expect
global.models = models