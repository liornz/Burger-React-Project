import React from 'react';
import useHttpErrorHandler from '../../hooks/http-error-handler';

import Modal from '../../components/UI/Modal/Modal';
import Auxilliary from '../Auxilliary/Auxilliary';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Auxilliary>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Auxilliary>
    );
  };
};

export default withErrorHandler;
