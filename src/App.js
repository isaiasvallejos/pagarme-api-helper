import { useState } from 'react'
import { withTheme } from '@rjsf/core'
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4'
import {
  Button,
  Nav,
  Navbar,
  NavDropdown,
  FormControl,
  Form,
  Container,
  Row,
  Col,
  Badge, NavLink
} from 'react-bootstrap'
import { FaGithub } from 'react-icons/fa';
import useTests from './tests/use'

import './App.css'

function App() {
  const SchemaForm = withTheme(Bootstrap4Theme)

  const [apiKey, setApiKey] = useState(localStorage.getItem('pagarme_api_key'))
  const [currentApiKey, setCurrentApiKey] = useState(apiKey)

  const {
    useTest,
    useFormData,
    tests,
    loading,
    schema,
    fakers,
    requestData,
    responseData,
    responseStatus
  } = useTests(apiKey)
  const { test, setTest, executeTest, prepareTest, fakeTest } = useTest()
  const { formData, setFormData } = useFormData()

  const updateApiKey = () => {
    localStorage.setItem('pagarme_api_key', currentApiKey)
    setApiKey(currentApiKey)
    setCurrentApiKey(currentApiKey)

    alert('API Key atualizada com sucesso!')
    setTest(null)
  }

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <img
            src="/favicon.png"
            width="30"
            height="30"
            className="d-inline-block align-top mr-3"
            alt="Pagar.me Icon"
          />
          Pagar.me • API Helper
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown
              title={test ? test.title : 'Selecionar teste'}
              id="basic-nav-dropdown"
              disabled={!apiKey}
            >
              {tests.map((test, index) => (
                <NavDropdown.Item onSelect={() => setTest(test)} key={index}>
                  {test.title}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Pagar.me API Key"
              className="mr-sm-2"
              value={currentApiKey}
              onChange={$event => setCurrentApiKey($event.target.value)}
            />
            <Button variant="outline-success" onClick={updateApiKey}>
              Atualizar key
            </Button>
          </Form>
          <Button size="md" variant="success" className="ml-2">
            <FaGithub /> Github
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid className="p-3">
        <Row>
          {!apiKey && <Col>Primeiramente, insira sua API Key da Pagar.me.</Col>}
          {loading && <Col>Carregando...</Col>}
          {!loading && test && schema && fakers && (
            <>
              <Col>
                <h2>{test.title}</h2>
                <hr />
                {fakers.map(faker => (
                  <Button
                    variant="secondary"
                    className="ml-2 mb-3"
                    size="sm"
                    type="button"
                    onClick={$event => fakeTest(faker, formData)}
                  >
                    {faker.title}
                  </Button>
                ))}
                <SchemaForm
                  formData={formData}
                  schema={schema}
                  onSubmit={$event => prepareTest($event.formData)}
                >
                  <div>
                    <Button variant="success" className="mr-3" type="submit">
                      Configurar requisição
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={() => prepareTest({})}
                    >
                      Limpar
                    </Button>
                  </div>
                </SchemaForm>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>
                    <b>Requisição</b>
                    <Button
                      variant="success"
                      size="sm"
                      className="mb-3 ml-3"
                      style={{ verticalAlign: '0px' }}
                      disabled={!requestData}
                      onClick={() => executeTest(formData)}
                    >
                      Executar requisição
                    </Button>
                  </Form.Label>
                  {formData && formData.postback_follow_url &&
                    <div className="mb-3">
                      <b>Acompanhe os postbacks gerados:</b> <a href={formData.postback_follow_url}>Request.bin</a>
                    </div>
                  }
                  <Form.Control
                    as="textarea"
                    rows={10}
                    value={
                      requestData ? JSON.stringify(requestData, null, 4) : ''
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <b>Resposta</b>
                    {responseStatus && !responseStatus.success && (
                      <Badge variant="danger" className="ml-2">
                        Erro
                      </Badge>
                    )}
                    {responseStatus && responseStatus.success && (
                      <Badge variant="success" className="ml-2">
                        Sucesso
                      </Badge>
                    )}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    value={
                      responseData ? JSON.stringify(responseData, null, 4) : ''
                    }
                    disabled={true}
                  />
                </Form.Group>
              </Col>
            </>
          )}
        </Row>
      </Container>
    </div>
  )
}

export default App
