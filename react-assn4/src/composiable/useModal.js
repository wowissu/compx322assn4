
export function useModal(props) {
  function emit(methodName, callback) {
    return (...args) => {
      if (props[methodName] === undefined) {
        throw new Error(`Modal props is missing ${methodName}.`);
      }
  
      callback?.(...args) ?? props[methodName]?.(...args);
    }
  }

  const emitClose = emit('onClose');
  const emitOK = emit('onOK');
  const emitCancel = emit('onCancel');
  const emitClickOutside = emit('onClickOutside', () => {
    if (props.clickOutsideToClose === true) {
      emitClose();
    }

    props.onClickOutside?.();
  })

  return {
    emit,
    emitClose,
    emitOK,
    emitCancel,
    emitClickOutside
  }
}