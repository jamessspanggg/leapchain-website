import React, {FC, ReactNode} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {Icon, IconType} from '@leapchain/ui';

import {Button} from 'components';
import {ROUTES} from 'constants/routes';
import {Opening} from 'types/openings';

import './OpeningDetails.scss';

interface ComponentProps {
  opening: Opening;
}

const OpeningDetails: FC<ComponentProps> = ({opening}) => {
  const history = useHistory();
  const location = useLocation<{from?: string}>();

  const handleBackClick = (): void => {
    if (location.state?.from) {
      history.goBack();
      return;
    }

    history.replace(`${ROUTES.openings}/${opening.category}`);
  };

  const renderContent = (): ReactNode => (
    <>
      <div className="OpeningDetails__position">{opening.title}</div>
      <div className="OpeningDetails__description">{opening.description}</div>
      {renderStringList(
        opening.responsibilities.map((responsibility) => responsibility.title),
        'Responsibilities',
      )}
      {renderStringList(
        opening.skills.map((skill) => skill.title),
        'Requirements',
      )}
    </>
  );

  const renderStringList = (listData: string[], listLabel: string): ReactNode => {
    return (
      <>
        <div className="OpeningDetails__list-label">{listLabel}</div>
        <ul className="OpeningDetails__ul">
          {listData.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className="OpeningDetails">
      <div className="OpeningDetails__actions-container">
        <div className="OpeningDetails__back-container" onClick={handleBackClick} role="button" tabIndex={0}>
          <Icon className="OpeningDetails__back-icon" icon={IconType.arrowLeft} />
          <span className="OpeningDetails__back-text">Back</span>
        </div>
        <Button onClick={() => window.open(opening.application_form, '_blank', 'noreferrer noopener')}>Apply</Button>
      </div>
      {renderContent()}
    </div>
  );
};

export default OpeningDetails;
