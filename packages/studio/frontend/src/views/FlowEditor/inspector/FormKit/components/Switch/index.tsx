import { Switch as BpSwitch } from '@blueprintjs/core'
import { useField } from 'formik'
import React, { useState, useMemo, FC, useEffect } from 'react'
import { Label, DynamicBtn } from '../../shared'
import * as layout from '../../shared/layout.module.scss'

export interface OwnProps {
  id?: string
  label: string
  hint?: string
  // value: string
  onChange?: any
  name: string
}

const Switch: FC<OwnProps> = ({ label, ...props }) => {
  const [isDynamic, setIsDynamic] = useState(false)

  const [field, meta, helpers] = useField({ ...props, type: 'checkbox' })
  // const [siField, siMta] = useField(props)

  const _isBool = (token: string) => {
    try {
      const parseToken = JSON.parse(field.value)
      if (typeof parseToken === 'boolean') {
        return parseToken
      }
    } catch {}
    return null
  }

  const valueBool = useMemo(() => _isBool(field.value), [field.value])

  useEffect(() => {
    if (valueBool === null) {
      setIsDynamic(false)
    }
  }, [])

  return (
    <div className={layout.formKitContainer}>
      <div className={layout.labelSection}>
        {!isDynamic && (
          <BpSwitch
            className={layout.leftBtn}
            {...field}
            // name={props.name}
            disabled={valueBool === null}
            large
          />
        )}
        <Label className={layout.center} label={label} hint={props.hint} />
        <DynamicBtn className={layout.rightBtn} active={isDynamic} onClick={() => setIsDynamic(!isDynamic)} />
      </div>
      {/* {isDynamic && (
        <SuperInput
          type={SiTypes.BOOL}
          // value={field.value}
          // {...field}
          // {...props}
          // onChange={(change) => {
          //   props.onChange(props.id, change)
          // }}
        />
      )} */}
    </div>
  )
}

export default Switch
