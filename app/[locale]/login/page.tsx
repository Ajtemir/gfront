'use client'

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Container,
  IconButton, InputAdornment,
  Typography
} from "@mui/material";
import { Logo } from "@/components/logo";
import { useTranslations } from "next-intl";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { FormikTextField } from "@/components/formik-text-field";
import { LoginValidationSchema } from "@/schemas";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { formatYupError } from "@/utils/format-yup-error";
import { nameof } from "@/utils/nameof";

const initialValues = {
  username: '',
  password: '',
}


const Login = () => {
  const t = useTranslations()
  const auth = useAuth()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  
  const handleClickShowPassword = () => setShowPassword(prev => !prev)
  const handleMouseDownPassword = () => setShowPassword(prev => !prev)
  
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginValidationSchema,
    onSubmit: async (values) => {
      const tryLogin = async () => {
        await auth.login(values.username, values.password)
        router.push('/')
      }
      
      await toast.promise(tryLogin(), {
        loading: t('Pending'),
        success: t('Success'),
        error: (err) => {
          console.error(formatYupError(err))
          
          return t('Failed')
        }
      })
    }
  })
  
  return (
    <Box
      component='main'
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth='sm' sx={{
        py: {
          xs: '60px',
          md: '120px'
        }
      }}
      >
        <Card elevation={16} sx={{p: 4}}>
          <CardContent>
            <Box sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
            >
              <Logo sx={{
                height: 40,
                width: 40
              }}
              />
              
              <Typography variant='h4'>
                {t("Gosnagrada")}
              </Typography>
              <Typography
                color='textSecondary'
                variant='body2'
                sx={{mt: 2}}
              >
                {t("Issue government rewards")}
              </Typography>
            </Box>

            <Box sx={{flexGrow: 1, mt: 3}} component='form' onSubmit={formik.handleSubmit}>
              <FormikTextField
                name={nameof(initialValues, 'username')}
                label='UserName'
                formik={formik}
              />
              
              <FormikTextField
                name={nameof(initialValues, 'password')}
                label='Password'
                formik={formik}
                type={showPassword ? 'text' : 'password'}
                sx={{mt: 2}}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='Toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        tabIndex={-1}
                      >
                        {
                          !formik.values.password
                            ? null
                            : showPassword ? <Visibility/> : <VisibilityOff/>
                        }
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              
              <ButtonGroup
                variant='contained'
                size='large'
                fullWidth
                sx={{mt: 2}}
              >
                <Button type='submit' autoFocus>
                  {t("Log in")}
                </Button>
              </ButtonGroup>

              <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  color='success'
                  onClick={() => router.push(`https://auth.infocom.kg/oauth/authorize?client_id=gosnagrada&scope=pin&redirect_uri=${window.location.origin}/account/auth-infocom&response_type=code&state=00fbch50p1wc3260d7e`)}
                  sx={{mt: 2}}
              >
                Войти через Е-Кызмат
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>

      <Typography
        color="textSecondary"
        variant="caption"
        sx={{
          mt: 'auto',
          mb: 1,
          mx: 'auto'
        }}
      >
        {t("Copyright", {date: new Date().getFullYear()})}
      </Typography>
    </Box>
  )
}

export default Login