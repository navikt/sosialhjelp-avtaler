import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, test } from 'vitest';
import { App } from './App';
import './locales/i18n';

describe('App', () => {
  test('render', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
  });
});
