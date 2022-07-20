import {  ServerError } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { useState } from "react"
import Alert from "../Alert/Alert";

interface ErrorType {
    error: ApolloError | undefined,
    alert?: boolean
}

const ErrorModal = ({error, alert}: ErrorType) => {
  const [isHidden, setIsHidden] = useState(false);

  const errorType = ({error}: ErrorType) => {
    if (error?.networkError) {
        return error?.networkError && (error.networkError as ServerError).result?.errors[0].message;
    } else {
        return 'Some different error'
    }
  }

  const showAlert = (alert: boolean | undefined) => {
    if (alert) {
        return <Alert />
    }

    return null;
  } 

  return (
    !isHidden ? (
        <div id="popup-modal" tabIndex={-1} className="overflow-y-auto flex justify-center items-center dimmed overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                    </button>
                    <div className="p-6 text-center">
                        <svg className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{errorType({error})}</h3>
                        <button onClick={() => setIsHidden(true)} data-modal-toggle="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : showAlert(alert)
  )
}
export default ErrorModal