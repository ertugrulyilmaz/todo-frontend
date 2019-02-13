import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import { Card, Checkbox, Col, Icon, Input, List, Radio, Row } from 'antd';
import { FormattedMessage } from 'react-intl';

import './index.css';

@observer(['userStore', 'todoStore'])
export default class HomePage extends Component {
  state = {
    filter: 'pending'
  };

  constructor(props) {
    super(props);

    this.toggleTodo = this.toggleTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.input = React.createRef();
  }

  toggleTodo(e) {
    this.props.todoStore.toggleTodo(e.target.value, e.target.checked);
  }

  addTodo(e) {
    const value = this.input.current.state.value;

    if (value) {
      this.props.todoStore.addTodo(value);
      this.input.current.handleReset();
    }
  }

  removeTodo(id) {
    this.props.todoStore.removeTodo(id);
  }

  componentDidMount() {
    this.props.todoStore.init();
  }

  onFilterChange(e) {
    this.setState({ filter: e.target.value });
  }

  render() {
    const { filter } = this.state;
    const todos = this.props.todoStore.getTodos;
    const todoAddNew = <FormattedMessage id="todo.add.new" />;
    console.log(todoAddNew);

    return (
      <Row
        className="home-page"
        type="flex"
        justify="space-around"
        align="top"
        gutter={8}
      >
        <Col span={12}>
          <Card
            title={
              <FormattedMessage id="todo.add.new" defaultMessage="Add new todo">
                {placeholder => (
                  <Input
                    addonBefore={<Icon type="plus" onClick={this.addTodo} />}
                    ref={this.input}
                    size="large"
                    allowClear
                    placeholder={placeholder}
                    onPressEnter={this.addTodo}
                  />
                )}
              </FormattedMessage>
            }
          >
            <div className="todo-filter">
              <Radio.Group
                size="large"
                buttonStyle="solid"
                defaultValue={filter}
                onChange={this.onFilterChange}
              >
                <Radio.Button value="pending">
                  <FormattedMessage id="todo.filter.pending" />
                </Radio.Button>
                <Radio.Button value="completed">
                  <FormattedMessage id="todo.filter.completed" />
                </Radio.Button>
                <Radio.Button value="all">
                  <FormattedMessage id="todo.filter.all" />
                </Radio.Button>
              </Radio.Group>
            </div>
            <List
              size="large"
              bordered
              dataSource={todos.filter(todo => {
                if (filter === 'all') return true;
                else if (filter === 'completed') {
                  return todo.checked;
                } else {
                  return !todo.checked;
                }
              })}
              locale={{ emptyText: 'Empty Todo' }}
              renderItem={todo => (
                <List.Item>
                  <Checkbox
                    onChange={this.toggleTodo}
                    value={todo.id}
                    checked={todo.checked}
                  >
                    <span
                      className={classnames({
                        'todo-description-wrapper': true,
                        checked: todo.checked
                      })}
                    >
                      {todo.value}
                    </span>
                  </Checkbox>

                  <div className="remove-wrapper">
                    <Icon
                      type="cross"
                      onClick={e => this.removeTodo(todo.id)}
                    />
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}
