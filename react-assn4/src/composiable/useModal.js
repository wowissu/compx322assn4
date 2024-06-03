/**
 * Custom hook to handle modal event emissions.
 *
 * @param {Object} props - The props passed to the modal component.
 * @returns {Object} - An object containing methods to emit modal events.
 */
export function useModal(props) {
  /**
   * Creates a function to emit a modal event.
   *
   * @param {string} methodName - The name of the method to emit.
   * @param {Function} [callback] - An optional callback to invoke.
   * @returns {Function} - A function to emit the specified modal event.
   */
  function emit(methodName, callback) {
    return (...args) => {
      if (props[methodName] === undefined) {
        throw new Error(`Modal props is missing ${methodName}.`);
      }
  
      callback?.(...args) ?? props[methodName]?.(...args);
    };
  }

  const emitClose = emit('onClose');
  const emitOK = emit('onOK');
  const emitCancel = emit('onCancel');

  /**
   * Emits the 'onClickOutside' event, closing the modal if `clickOutsideToClose` is true.
   */
  const emitClickOutside = emit('onClickOutside', () => {
    if (props.clickOutsideToClose === true) {
      emitClose();
    }

    props.onClickOutside?.();
  });

  return {
    emit,
    emitClose,
    emitOK,
    emitCancel,
    emitClickOutside
  };
}
