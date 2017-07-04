import React, { PureComponent } from 'react';
import { Modal, Button } from 'antd';

import DomainMapper from '../../../utils/DomainMapper';

import BgImgListComponent from './BgImgListComponent';

import './bg-img-selector-component.less';

const mapper = {
    modelMapper: (model) => {
        return {
            bgItem: model.bgItem
        };
    },
    actionMapper: () => {}
};

@DomainMapper(mapper)
export default class BgImgSelectorComponent extends PureComponent {
    _handleOk(e) {
        const { toggleVisible, changeTplContainerBg, bgItem } = this.props;
        changeTplContainerBg(true, bgItem);
        toggleVisible();
    }

    _handleCancel(e) {
        const { toggleVisible } = this.props;
        toggleVisible();
    }

    render() {
        return (
            <div>
                <Modal
                  title="选择背景图片"
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
                  wrapClassName="bg-img-selector-component"
                >
                    <BgImgListComponent />
                </Modal>
            </div>
        );
    }
}
