import React, { PureComponent } from 'react';
import cx from 'classnames';

import DomainMapper from '../../../utils/DomainMapper';

const mapper = {
    modelMapper: (model) => {
        return {
            selectedMaterialImg: model.selectedMaterialImg,
            materialImgList: model.materialImgList
        };
    },
    actionMapper: (action) => {
        return {
            setSelectedMaterialImg: action.setSelectedMaterialImg
        };
    }
};

@DomainMapper(mapper)
export default class MaterialListComponent extends PureComponent {
    render() {
        const { materialImgList, selectedMaterialImg, setSelectedMaterialImg } = this.props;
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        return (
            <div className="material-list-component">
                { materialImgList.map((materialImgItem, index) => {
                    const resourceImageClass = cx({
                        'resource-image': true,
                        active: selectedMaterialImg && (materialImgItem.resourceId === selectedMaterialImg.resourceId)
                    });

                    return (
                        <div className={resourceImageClass} key={index} onClick={() => {
                            setSelectedMaterialImg(materialImgItem);
                        }}
                        >
                            <img src={materialImgItem.imgUrl} key={index} alt="" />
                        </div>
                    );
                })}
            </div>
        );
        /* eslint-enable jsx-a11y/no-static-element-interactions */
    }
}

