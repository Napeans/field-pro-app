import { StyleSheet } from 'react-native';
export const Colors = {
  buttonTextColor: '#fff',
  BACKGROUND_COLOR : '#F0F4F2',
  PRIMARY_BLUE: '#04A554',
  ERROR_RED:'#FF3B30',
  BUTTON_DISABLECOLOR:'#DBFDCA'
};

export const GlobalFontSize = {
  HeaderSize: 22,
  InputSize: 18,
};

const GlobalStyles = StyleSheet.create({
      scrollContent: {
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: 'center',    
    padding: 20,
    backgroundColor:'white'
  },
 title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop:10,
    textAlign: 'center',
    fontFamily: 'sans-serif'
  },
   subTitle: {
    fontSize: 15,
    fontWeight: 'normal',
    marginTop:0,
    marginBottom:10,
    textAlign: 'center',
  },
    inputHeader: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom:10,
    textAlign: 'center',
  },
    input: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.PRIMARY_BLUE,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  
  button: {
    height: 50,
    backgroundColor: Colors.PRIMARY_BLUE,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
   disabledButton: {
    backgroundColor: Colors.BUTTON_DISABLECOLOR,
  },

  disabledButtonText: {
    color: Colors.PRIMARY_BLUE,
  },
});

export default GlobalStyles;
