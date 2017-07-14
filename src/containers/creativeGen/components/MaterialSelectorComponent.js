import React, { PureComponent } from 'react';
import { Modal, Button } from 'antd';

import MaterialCategoryComponent from './MaterialCategoryComponent';
import MaterialListComponent from './MaterialListComponent';

import './material-selector-component.less';

import DomainComponentCreator from '../../../utils/DomainComponentCreator';
import MaterialSelectorDomain from './MaterialSelectorDomain';

@DomainComponentCreator(MaterialSelectorDomain)
export default class MaterialSelectorComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedMaterialImg: null
        };
    }

    _handleOk(e) {
        const { toggleVisible, onChange, model } = this.props;
        onChange(model.selectedMaterialImg);
        toggleVisible();
    }

    _handleCancel(e) {
        const { toggleVisible } = this.props;
        toggleVisible();
    }

    render() {
        const { templateElementId } = this.props;

        return (
            <div>
                <Modal
                  title="选择素材图片"
                  visible={this.props.visible}
                  onOk={::this._handleOk}
                  onCancel={::this._handleCancel}
                  width="680px"
                  footer={[
                      <Button key="submit" size="large" onClick={::this._handleOk}>
                          确认
                      </Button>,
                      <Button key="back" size="large" onClick={::this._handleCancel}>
                          取消
                      </Button>
                  ]}
                  wrapClassName="material-selector-component"
                >
                    <MaterialCategoryComponent templateElementId={templateElementId} />
                    <MaterialListComponent />
                </Modal>
            </div>
        );
    }
}
