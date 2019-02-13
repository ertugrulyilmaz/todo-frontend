import React from 'react';
import { Link } from 'react-router-dom';
import {
  Form,
  Input,
  Layout,
  Icon,
  Divider,
  Button,
  Spin,
  Card,
  Row,
  Col
} from 'antd';
import { observer } from 'mobx-react';
import './index.css';

@observer(['userStore'])
class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loading: false };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose = e => {
    this.setState({ visibleAgreement: false });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.userStore.register(values);

        this.setState({ loading: true });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;

    return (
      <Layout hasSider={false}>
        <Layout.Content className="login-page" style={{ background: '#fff' }}>
          <Row type="flex" justify="center" gutter={8}>
            <Col
              span={24}
              style={{
                height: '100%',
                minHeight: '100%',
                marginTop: '10%',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Card title={'SIGN UP TO PLATFORM'}>
                <Form onSubmit={this.handleSubmit} style={{ width: 350 }}>
                  <Form.Item>
                    {getFieldDecorator('firstName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter your first name!'
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        placeholder="First Name"
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('lastName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter your last name!'
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        placeholder="Last Name"
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('email', {
                      rules: [
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!'
                        },
                        { required: true, message: 'Please enter your email!' }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="mail"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        placeholder="Email"
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter your password!'
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        type="password"
                        placeholder="Password"
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {loading ? (
                      <Button
                        type="primary"
                        disabled
                        className="register-form-button"
                      >
                        <Spin size="small" />
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        className="register-form-button"
                      >
                        Register
                      </Button>
                    )}

                    <Divider>or</Divider>
                    <div style={{ textAlign: 'center' }}>
                      <Link to="/" title="Log in">
                        Log in
                      </Link>
                    </div>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    );
  }
}

const RegisterPageForm = Form.create()(RegisterPage);

export default RegisterPageForm;
