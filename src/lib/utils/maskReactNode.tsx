import ReactDOM from 'react-dom';

export const wrapComponent = (component: JSX.Element): Node => {
  const placeholder = document.createElement('div');
  ReactDOM.render(component, placeholder);
  return placeholder;
};
