
import React, { useState } from 'react'
import TextInput from './components/TextInput'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Button from './components/Button'
import Background from './components/Background'
import BackButton from './components/BackButton'
import Logo from './components/Logo'
import Header from './components/Header'
import { theme } from './core/theme'


export default function App({ navigation }) {

  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    <Background>
    <BackButton goBack={{}} />
    <Logo />
    <Header>Welcome back.</Header>
    <TextInput
      label="Email"
      returnKeyType="next"
      value={email.value}
      onChangeText={(text) => setEmail({ value: text, error: '' })}
      error={!!email.error}
      errorText={email.error}
      autoCapitalize="none"
      autoCompleteType="email"
      textContentType="emailAddress"
      keyboardType="email-address"
    />
    <TextInput
      label="Password"
      returnKeyType="done"
      value={password.value}
      onChangeText={(text) => setPassword({ value: text, error: '' })}
      error={!!password.error}
      errorText={password.error}
      secureTextEntry
    />
    <View style={styles.forgotPassword}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPasswordScreen')}
      >
        <Text style={styles.forgot}>Forgot your password?</Text>
      </TouchableOpacity>
    </View>
    <Button mode="contained" onPress={onLoginPressed}>
      Login
    </Button>
    <View style={styles.row}>
      <Text>Don’t have an account? </Text>
      <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
        <Text style={styles.link}>Sign up</Text>
      </TouchableOpacity>
    </View>
  </Background>
  );
}


const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})