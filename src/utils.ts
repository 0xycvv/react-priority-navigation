export const getElementContentWidth = (element: any) => {
  const styles = window.getComputedStyle(element);
  const padding = parseFloat(styles.paddingLeft || '2') +
      parseFloat(styles.paddingRight || '2');
  return element.clientWidth - padding;
};
