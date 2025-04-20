import React from "react"
import { Button, Form, SafeAreaView, Typography } from "@/src/components"
import { useForm } from "react-hook-form"
import { FormHelpers } from "@/src/components/Form"
import { validatePassword } from "@/src/utils"

const RegisterScreen = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            lastName: '',
            email: '',
            username: '',
            birthdate: '',
            phone: '',
            password: '',
        },
        mode: 'onBlur', 
    })

    const onSubmit = async (data: any) => {
       console.log('Form data:', data)
    }
    
    return (
        <SafeAreaView>
            <Form.Root controlled>
                <Typography variant="h1" children="Cadastro" />
                <Typography
                    variant="body1"
                    children="Preencha os campos abaixo para criar sua conta"
                />
              {FormHelpers.createFormFields({
                control,
                fields: [
                  {
                    name: 'birthdate',
                    type: 'textfield',
                    rules: { 
                      required: 'Data de nascimento é obrigatória',
                      pattern: {
                        value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                        message: 'Formato inválido. Use DD/MM/AAAA'
                      },
                      validate: {
                        validateDate: (value) => {
                          const isValid = validatePassword(value)
                          return isValid || 'Data inválida'
                        }
                      }
                    },
                    componentProps: {
                      placeholder: 'DD/MM/AAAA',
                      label: 'Data de Nascimento',
                    },
                    errorMessage: errors.birthdate?.message,
                  },
                  {
                    name: 'phone',
                    type: 'textfield',
                    rules: { 
                      required: 'Telefone é obrigatório',
                      pattern: {
                        value: /^\(\d{2}\) \d{5}-\d{4}$/,
                        message: 'Formato inválido. Use (XX) XXXXX-XXXX'
                      }
                    },
                    componentProps: {
                      placeholder: '(XX) XXXXX-XXXX',
                      label: 'Telefone',
                      keyboardType: 'phone-pad',
                    },
                    errorMessage: errors.phone?.message,
                  },
                  {
                    name: 'password',
                    type: 'textfield',
                    rules: { 
                      required: 'Senha é obrigatória',
                      minLength: {
                        value: 8,
                        message: 'Senha deve ter pelo menos 8 caracteres'
                      },
                      validate: {
                        validatePassword: (value) => {
                          const isValid = validatePassword(value)
                          return isValid || 'Senha deve conter letras, números e caracteres especiais'
                        }
                      }
                    },
                    componentProps: {
                      placeholder: '********',
                      label: 'Senha',
                      secureTextEntry: true,
                    },
                    errorMessage: errors.password?.message,
                  }
                ]
              })}
                <Button
                    variant="primary"
                    onPress={handleSubmit(onSubmit)}
                    full
                    disabled={Object.keys(errors).length > 0}
                    children="Cadastrar"
                />
            </Form.Root>
        </SafeAreaView>
    )
}
export default RegisterScreen