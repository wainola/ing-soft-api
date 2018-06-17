class TestHandler{
  static testEndpoint(request, response, next){
    return response.status(200).send({'msg': 'testing endpoint'})
  }
}

export default TestHandler