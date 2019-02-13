import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
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
import { alert } from '../../helpers';
import './index.css';

@observer(['userStore'])
class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loading: false };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email, password, remember } = values;

        this.setState({ loading: true });
        const $this = this;

        this.props.userStore.login(email, password, remember).catch(error => {
          alert.error(error.toString());

          $this.setState({ loading: false });
        });
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
                marginTop: 'calc(10%)',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Card title={<FormattedMessage id="login.title" />}>
                <Form onSubmit={this.handleSubmit} style={{ width: 350 }}>
                  <Form.Item>
                    {getFieldDecorator('email', {
                      rules: [
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!'
                        },
                        {
                          required: true,
                          message: 'Please enter your email!'
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="mail"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        placeholder="Email Address"
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter your Password!'
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
                        className="login-form-button"
                      >
                        <Spin size="small" />
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >
                        Log in
                      </Button>
                    )}

                    <Divider>or</Divider>
                    <div style={{ textAlign: 'center' }}>
                      <Link to="/register" title="Register Now!">
                        Register Now!
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

const LoginPageForm = Form.create()(LoginPage);

export default LoginPageForm;
