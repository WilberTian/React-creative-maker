import React, { PureComponent } from 'react';

import { message } from 'antd';

import MaterialSelectorComponent from './MaterialSelectorComponent';

import './template-image-component.less';

export default class TemplateImageComponent extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            materialSelectorVisible: false
        };
    }

    _mouseEnterHandler() {
        this.maskDomEl.style.display = 'flex';
    }

    _mouseLeaveHandler() {
        this.maskDomEl.style.display = 'none';
    }

    _toggleMaterialSelector() {
        this.setState({
            materialSelectorVisible: !this.state.materialSelectorVisible
        });
    }

    _updateElementData(marterialImg) {
        const { setElementData, elementId, attrs } = this.props;

        setElementData(elementId, 'attrs', {
            ...attrs,
            src: marterialImg.imgUrl
        });
    }

    render() {
        const { className, setElementData, attrs, elementId } = this.props;
        const { field, width, height, maxFileSize, placeholder } = attrs;
        const duration = 5;
        const self = this;
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        return (
            <div
              onMouseEnter={::this._mouseEnterHandler}
              onMouseLeave={::this._mouseLeaveHandler}
            >
                {attrs.src && <img
                  className={`template-image-component ${className}`}
                  src={attrs.src}
                  alt=""
                />}
                {!attrs.src && <div
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
                  onClick={::this._toggleMaterialSelector}
                >
                    {placeholder}
                </div>
                { this.state.materialSelectorVisible && <MaterialSelectorComponent
                  visible={this.state.materialSelectorVisible}
                  toggleVisible={::this._toggleMaterialSelector}
                  templateElementId={elementId}
                  onChange={::this._updateElementData}
                />}
            </div>
        );
        /* eslint-enable jsx-a11y/no-static-element-interactions */
    }
}
