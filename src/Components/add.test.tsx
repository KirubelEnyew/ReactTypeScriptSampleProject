import { render, screen } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "react-query"
import { Provider } from "react-redux"
import Add from "./add"
import store from "../Store/store"
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom"

test('The pizzas is being rendered', () => {
    render(
        <Provider store={store}>
            <QueryClientProvider client={new QueryClient}>
                <BrowserRouter>
                <Add />
                </BrowserRouter>
            </QueryClientProvider>
        </Provider>
    )
    const addElement = screen.getByRole('button',{name:'Confirm'});
    expect(addElement).toBeEnabled();
})