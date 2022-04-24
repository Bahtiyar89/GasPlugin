import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: { width:"90%", paddingTop:"2%", fontSize:18, fontWeight:'bold', marginTop:20, marginBottom: 20, },
  textInput: { width:"90%" },
  buttonText: { color: 'white' },
  floatLeft_right: {
    marginTop: 10,
    flexDirection:"row",
    justifyContent: 'space-between',
    width:'98%'
  }
});

export default styles;
