import React, { PureComponent } from 'react';
import cx from 'classnames';

import DomainMapper from '../../../utils/DomainMapper';

const mapper = {
    modelMapper: (model) => {
        return {
            bgItem: model.bgItem
        };
    },
    actionMapper: (action) => {
        return {
            chooseBackground: action.chooseBackground
        };
    }
};

@DomainMapper(mapper)
export default class BgImgItemComponent extends PureComponent {
    _chooseBgImg(bgImgItem) {
        const { chooseBackground } = this.props;
        chooseBackground(bgImgItem);
    }

    render() {
        const { bgImgItem, bgItem } = this.props;

        const bgImgClass = cx({
            'bg-img-item-component': true,
            active: bgItem && bgImgItem.id === bgItem.id
        });

        /* eslint-disable jsx-a11y/no-static-element-interactions */
        return (
            <div className={bgImgClass} onClick={() => {
                this._chooseBgImg(bgImgItem);
            }}
            >
                <img
                  className="bg-image"
                  src={bgImgItem.picUrl} alt=""
                />
            </div>
        );
        /* eslint-enable jsx-a11y/no-static-element-interactions */
    }
}
