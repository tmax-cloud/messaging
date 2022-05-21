import { Formik } from 'formik'
import React, { FC } from 'react'

import AutoSave from './AutoSave'

interface OwnProps {
  initialValues: any
  onSubmit: any
}

const FormKit: FC<OwnProps> = ({ initialValues, onSubmit, children }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <>
        {children}
        <AutoSave />
      </>
    </Formik>
  )
}

export default FormKit
export * from './components'
