import React from 'react';
import PropTypes from 'prop-types';
import InnerForm from '@wsb/guac-widget-shared/lib/components/Form';
import DataAid from '../../common/constants/data-aids';
import { UX2 } from '@wsb/guac-widget-core';
import Field from '../../common/constants/editable-field-tags';
import { FORM_PIVOT } from '../../common/constants/routes';

class ContactForm extends React.Component {
  constructor() {
    super();
    this.state = { isFormRevealed: false };
    this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
  }

  toggleFormVisibility(e) {
    e && e.preventDefault();
    this.setState({ isFormRevealed: !this.state.isFormRevealed });
  }

  renderForm(display) {
    const { formTitle } = this.props;

    const styles = {
      block: {
        marginTop: 'xlarge',
        display: display ? 'block' : 'none'
      }
    };

    const titleElement = (
      <UX2.Element.Heading.Minor
        style={{ marginBottom: 'medium' }}
        data-aid={ DataAid.CONTACT_FORM_TITLE_REND }
        data-route={ Field.FORM_TITLE }
        data-field-route={ FORM_PIVOT }
        children={ formTitle }
      />
    );

    return (
      <UX2.Element.Block data-aid={ DataAid.CONTACT_FORM_CONTAINER_REND } style={ styles.block }>
        <InnerForm
          title={ titleElement }
          onFormClose={ this.toggleFormVisibility }
          fullWidth={ false }
          dataAidPrefix='CONTACT'
          useColumnLayout
          { ...this.props }
        />
      </UX2.Element.Block>
    );
  }

  render() {
    if (!this.props.formEnabled) { return null; }
    const { formTitle, category, section } = this.props;

    return (
      <UX2.Element.Block category={ category } section={ section } >
        { !this.state.isFormRevealed &&
          <UX2.Element.Button.Primary
            tag='button'
            onClick={ this.toggleFormVisibility }
            data-aid={ DataAid.CONTACT_FORM_REVEAL_BUTTON_REND }
            data-route={ Field.FORM_TITLE }
            data-field-route={ FORM_PIVOT }
            children={ formTitle }
            style={{ marginTop: 'xlarge' }}
          />
        }
        { this.renderForm(this.state.isFormRevealed)  }
      </UX2.Element.Block>
    );
  }

}

ContactForm.propTypes = {
  blankInfo: PropTypes.bool,
  formEnabled: PropTypes.bool,
  formTitle: PropTypes.string,
  category: PropTypes.string,
  section: PropTypes.string,
  ...InnerForm.propTypes
};

export default ContactForm;
