import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {  width:"90%", color: '#000000', fontWeight: 'bold', fontSize: 28 },
  textparagraph:{  
    width:"90%", paddingTop:"2%" },
  signInText: { color: '#768192' }, 
    
  headerLowerText: { width:"90%", paddingTop:'5%', color: '#000000', fontWeight: 'bold', fontSize: 20 },  
  textInput: { width:"90%" }, 
  button: { marginTop:10, width:'90%', backgroundColor: '#333333', marginBottom: 20},
  buttonText: { color: 'white', padding:'12%'  }, 

  scrollView: {
    backgroundColor: '#fff',
  },
  body: {
    backgroundColor: '#fff',
  },
  sectionContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
   
  buttonTouchable: {
    padding: 16,
  },
});

export default styles;
