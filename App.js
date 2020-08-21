import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
//formik para manejo de formularios
import { Formik, useFormikContext, useField } from 'formik'
//yup sirve para validaciones libreria externa
import * as yup from 'yup'


//componente reutilizable
const MyInput = ({ fieldName,title }) => {
  //uso de useFiel
  const [field, meta] = useField(fieldName)
  return (
    <>
      <Text>{title}</Text>
      <TextInput
        style={styles.input}
        onChangeText={field.onChange(fieldName)}
        value={field.value}
        onBlur={field.onBlur(fieldName)}
      />
      {/* errores */}
      {meta.error && meta.touched && (
        <Text style={{ color: 'red' }} >{meta.error} </Text>
      )}
    </>
  )
}

//tiene que ser una funcion
const EmailForm = () => {
  const { submitForm } = useFormikContext();
  return (
    <>
      <Text style={styles.text}>Formulario</Text>
      <MyInput fieldName="email"  title="Correo Electronico"/>
      <MyInput fieldName="name" title="Nombre"/>
      <Button title='Enviar' onPress={submitForm} />
    </>
  )
}

export default function App() {
  //usamos el contexto de formik

  return (
    <View style={styles.container}>
      <Formik

      //para verifivar que se envia
        onSubmit={x => console.log(x)}
        //validaciones
        validationSchema={yup.object({
          email: yup.string().email('Correo Invalido')
            .required('Requerido'),
          name: yup.string()
            .min(4)
            .required('Requerido')
        })}
        initialValues={{ email: '', name:'' }}
      >
        
        <EmailForm />
      </Formik>
    </View>
  )


  //MANERA DE CREAR FORMULARIO EXPLICITO
  // const formik=useFormik({
  //   initialValues:{
  //     email:'',
  //   },
  //   validationSchema:yup.object({
  //     email:yup.string()
  //       .email('Correo Invalido')
  //       .required('Requerido')
  //   }),
  //   onSubmit:x=>console.warn(x)
  // })

  // return (
  //   <View style={styles.container}>
  //     <Text>Email</Text>
  //     <TextInput
  //       //para que muestre el erro cuando ya se mande el formulario
  //       onBlur={formik.handleBlur('email')}
  //       style={styles.input}
  //       onChangeText={formik.handleChange('email')}
  //       value={formik.values.email}
  //     //validacion

  //     />
  //     {formik.errors.email && formik.touched.email ?
  //       <Text>{formik.errors.email}</Text> : null}
  //     <Button
  //       title="Enviar"
  //       onPress={formik.handleSubmit}
  //     />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 35,
    width: 150,
    backgroundColor: '#eee'
  },
  text:{
    fontSize:20,
  }
});
