import React, { PureComponent } from 'react';
import { Modal, Tooltip } from 'antd';

import ColorListComponent from './ColorListComponent';

import './template-text-component.less';
import iconBgColor from '../../../images/icon/icon-bg-color.png';

export default class TemplateTextComponent extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            readOnly: true,
            textContent: this.props.attrs.content
        };
    }

    _mouseEnterHandler() {
        if (this.state.readOnly) {
            this.maskDomEl.style.display = '';
        }
    }

    _mouseLeaveHandler() {
        if (this.state.readOnly) {
            this.maskDomEl.style.display = 'none';
        }
    }

    _changeTextMode() {
        this.setState({
            readOnly: !this.state.readOnly
        }, () => {
            if (!this.state.readOnly) {
                this.templateText.focus();
            } else {
                const value = this.state.textContent;
                const { attrs, setElementData } = this.props;
                const { min, max } = attrs;
                if (value.length < min || value.length > max) {
                    Modal.error({
                        title: '文案长度错误',
                        content: this.props.attrs.placeholder,
                        okText: '修改',
                        onOk: () => {
                            this._changeTextMode();
                        }
                    });
                } else {
                    setElementData(this.props.elementId, 'attrs', {
                        ...this.props.attrs,
                        content: this.state.textContent
                    });
                }
            }
        });
        this.maskDomEl.style.display = 'none';
    }

    _changeTextColor(color) {
        const { setElementData, css, elementId } = this.props;
        setElementData(elementId, 'css', { ...css, color });
    }

    _templateTextChange(e) {
        this.setState({
            textContent: e.target.value
        });
    }

    render() {
        const { className, attrs } = this.props;
        const { placeholder, content, colors } = attrs;
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        return (
            <div
              onMouseEnter={::this._mouseEnterHandler}
              onMouseLeave={::this._mouseLeaveHandler}
            >
                { this.state.readOnly ?
                    <span
                      className={`template-text-component readonly ${className}`}
                    >
                        {this.state.textContent || placeholder}
                    </span> :
                    <input
                      className={`template-text-component editable ${className}`}
                      onBlur={::this._changeTextMode}
                      onChange={::this._templateTextChange}
                      value={this.state.textContent}
                      placeholder={placeholder}
                      ref={(input) => { this.templateText = input; }}
                    />
                }
                <Tooltip
                  title={() => {
                      return React.createElement(ColorListComponent, {
                          colors,
                          onChange: (color) => { this._changeTextColor(color); }
                      });
                  }}
                  placement="bottom"
                  overlayClassName="template-text-color"
                >
                    <div
                      className={`text-mask ${className}`}
                      onClick={::this._changeTextMode}
                      ref={(mask) => {
                          this.maskDomEl = mask;
                      }}
                      style={{ display: 'none' }}
                    />
                </Tooltip>
            </div>
        );
        /* eslint-enable jsx-a11y/no-static-element-interactions */
    }
}
