import { render, screen, fireEvent } from "@testing-library/react"
import axiosMock from 'axios'
import Home, { url, fetcher } from './home'
import Add from './add'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import '@testing-library/jest-dom';
import store from "../Store/store";
jest.mock('axios');
describe('Fetch Pizzas', () => {
  test('Pizza List should be returned', async () => {
    const pizzas = {
      data: [
        {
          id: "144",
          pizzaName: "React Pizza",
          ingredients: "Re1 Re2",
          time_created: "2021-09-20 15:28:58"
        },
        {
          id: "152",
          pizzaName: "Reduxed Pizza",
          ingredients: "S1,S2",
          time_created: "2021-09-20 16:13:20"
        },
      ],
      message: "Pizza successfully fetched",
      status: 200
    }
    const result = await fetcher()
    const axiosElement = screen.findAllByText('Pizza')
    expect(axiosMock.get).toHaveBeenCalledWith(url)
    expect(result).toBeUndefined();
  })

})
describe('Pizza List', () => {
  test('should render text in fields', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={new QueryClient}>
          <BrowserRouter>
            <Add/>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    )
    const inputElement = screen.getByPlaceholderText(/Enter Pizza Name/i)
    const inputElement2 = screen.getByPlaceholderText(/Enter Ingredients/i)
    const buttonElement = screen.getByRole('button', { name: 'Confirm' })
    fireEvent.change(inputElement, { target: { value: "" } })
    fireEvent.change(inputElement2, { target: { value: '' } })
    fireEvent.click(buttonElement)
    const required = screen.getByDisplayValue('please')
    expect(required).toBeInTheDocument()
  })
})
