import * as Yup from 'yup'
import { FormField } from './_types'

export const searchForm  = 'form'

export const validationSchema = Yup.object().shape({
    city: Yup.string().required('Required'),
    country: Yup.string().required('Required')
})

export const initialValues: FormField = {
    city: "",
    country: ""
}