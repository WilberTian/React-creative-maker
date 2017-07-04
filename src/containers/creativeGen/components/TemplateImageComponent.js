import React, { PureComponent } from 'react';

import { Upload, message, Button } from 'antd';

import './template-image-component.less';

export default class TemplateImageComponent extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            src: this.props.attrs.src
        };
    }

    _mouseEnterHandler() {
        this.maskDomEl.style.display = 'flex';
    }

    _mouseLeaveHandler() {
        this.maskDomEl.style.display = 'none';
    }

    render() {
        const { className, setElementData, attrs } = this.props;
        const { field, width, height, maxFileSize, placeholder } = attrs;
        const duration = 5;
        const self = this;

        const props = {
            name: 'file',
            action: '/api/op_uploadImageToVenus',
            showUploadList: false,
            onChange(info) {
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} 上传成功`);

                    self.setState({
                        src: info.file.response.data.imgUrl
                    });

                    setElementData(self.props.elementId, 'attrs', {
                        ...self.props.attrs,
                        src: info.file.response.data.imgUrl
                    });
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 上传失败.`, duration);
                }
            },
            beforeUpload(file) {
                const checkSize = file.size / 1024 < maxFileSize;
                if (!checkSize) {
                    message.error(`图片必须小于${maxFileSize}KB!`);
                }

                return checkSize;
            }
        };

        return (
            <div
              onMouseEnter={::this._mouseEnterHandler}
              onMouseLeave={::this._mouseLeaveHandler}
            >
                {this.state.src && <img
                  className={`template-image-component ${className}`}
                  src={this.state.src}
                  alt=""
                />}
                {!this.state.src && <div
                  className={`empty-image ${className}`}
                  ref={(empty) => {
                      this.emptyDomEl = empty;
                  }}
                >
                    {placeholder}
                </div>}
                <div
                  className={`image-mask ${className}`}
                  ref={(mask) => {
                      this.maskDomEl = mask;
                  }}
                >
                    {placeholder}
                </div>
                <Upload {...props} className={`image-uploader ${className}`} />
            </div>
        );
    }
}
