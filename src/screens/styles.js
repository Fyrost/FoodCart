import { StyleSheet,Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

module.exports=StyleSheet.create({
  horizontalPadding16: {
    paddingHorizontal: screenWidth/16
  },
  containerCenter: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerSafeArea:{
    paddingTop:30,
  },

  flexContainer:{
    flex: 1,
  },

  flexContainerRow:{
    flexDirection: 'row'
  },
  scrollable:{
    flex: 8,
    paddingHorizontal: screenWidth/8
  },
  //default auth Styles
  authContainer:{
    justifyContent: 'center',
    paddingHorizontal: screenWidth/8,
  },

  authTitleContainer:{
    justifyContent: 'flex-start',
    marginTop: screenWidth/8
  },

  authtitleText:{
    fontSize: 24,
    fontWeight: '800',
    color: '#3D3D3E'
  },

  authTextContainer:{
    justifyContent: 'flex-start',
    marginTop: 15,
  },

  authText:{
    fontSize: 18,
    color: '#3D3D3E'
  },

  authInputContainer:{
    alignItems: 'center',
    alignContent: 'space-around',
    marginTop: 10,
  },

  authInputRow:{
    height: 50,
    width: '100%'
  },

  authButtonContainer:{
    alignItems: 'center',
    alignContent: 'space-around'
  },

  authButton:{
    backgroundColor: '#11CDEF',
    borderRadius: 0
  },

  authButtonSize:{
    width: screenWidth/3,
    marginTop: 45
  },

  authLink:{
    color: '#11CDEF',
    marginTop: 35,
    textDecorationLine: 'underline'
  },

  authIcon:{
    color: '#11CDEF',
    fontSize: 36
  },
//Login Styles
  loginLogoContainer:{
    flex: 3,
    alignItems: 'center',
    padding: 10,
    justifyContent:'flex-end'
  },

  loginLogo:{
    resizeMode: 'contain',
    height: screenHeight/4,
    
  },

  loginInputContainer:{
    paddingHorizontal: 20,
    flex: 2,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    paddingTop:10
  },

  loginInputRow:{
    flex:1,
    marginVertical:10
  },

  loginButtonContainer:{
    flex: 3,
    alignItems: 'center',
    alignContent: 'space-between',
  },

  loginLink:{
    color: '#11CDEF',
    textDecorationLine: 'underline',
    top: 40,
    marginTop: 20,
  },

  loginButton:{
    backgroundColor: '#11CDEF',
     borderRadius: 0
  },

  loginButtonSize:{
    width: screenWidth/3,
    top: 25
  },
//SignUp Styles
  signUpContainer:{
    flex:4,
    justifyContent:'space-between',
    paddingHorizontal: screenWidth/16
  },

  signUpInputRow:{
    flex:1,
  },
//OwnerInitialScreen
  ownerOverlayHeader:{
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },

  ownerOverlayImage: {
    height: 150,
    width: 150,
  },

  ownerOverlayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },

  ownerOverlaySubtitleContainer: {
    flexWrap: 'wrap',
    alignItems: 'center'
  },

  ownerOverlaySubtitle: {
    fontWeight: 'normal',
    alignItems: 'center',
    color: '#9DA0A3'
  },
  
  ownerOverlayText: {
    marginTop: 25
  },

  ownerFormHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  ownerFormColumn: {
    flex: 1
  },

  ownerFormRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5
  },

  ownerFormBody: {
    flex: 10,
    justifyContent: 'space-between',
  },

  ownerFormText: {
    fontSize: 18
  },

  ownerFormPicker: {
    marginRight: 10,
    borderWidth: 0,
    borderBottomColor: '#11CDEF',
    borderBottomWidth: 1
  },

  ownerFormButtonContainer: {
    flex: 1
  },  
//MenuList
  menuTitle:{
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8
  },

  menuDescription:{
    fontSize: 14,
    color: '#3D3D3E'
  },
  
  menuImage:{
    height: 100,
    width: 100,
  },
  
  menuContainer:{
    paddingTop:24.2
  },
//MenuView
  menuViewImage:{
    height: 150,
    width: screenWidth,
    flex: 1, 
  },
 
  menuViewTitle:{
    fontSize: 32,
    color: 'white',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
 
  menuViewSubTitle:{
    fontWeight: '600',
  },
 
  menuViewText:{
    fontWeight: 'normal',
    color: '#3D3D3E',
    textAlign: 'left'
  },
 
  menuViewBody:{
    flex: 2
  },

  menuViewRow:{
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'lightgrey',
    borderBottomWidth: 1,
    paddingHorizontal: screenWidth/12,
    paddingVertical: 10
  },

  menuViewRowSimple: {
    flex: 2, 
    flexDirection: 'row', 
    alignItems: 'center',
    paddingHorizontal: screenWidth/12,
  },

  menuViewSubtitleContainer:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuViewTextContainer: {
    flex: 2, 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    alignItems: 'center',  
    alignSelf: 'center',
  },
//MenuAdd/MenuEdit
  menuAddBody:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  menuAddTitle: {
    fontSize: 18,
    fontWeight: '500'
  },
  menuAddText: {
    fontSize: 18
  },
  menuAddNote:{
    fontSize: 14,
    color: '#F7F7FF',
    textAlign:'justify'
  },
  menuAddPickerError: {
    position: 'absolute',
    color: '#EF1B17',
    top: 60,
    left: 23
  },  
//Category
  categoryOverlayContainer:{
    alignItems: 'center',
    justifyContent: 'center'
  },
 
  categoryOverlayTitle:{
    fontWeight: '500',
    fontSize: 20,
    color: '#1B73B4'
  },
 
  categoryOverlayImage:{
    resizeMode: 'contain',
    height: 100,
    width: 100,
  },
 
  categoryOverlayButton:{
    width: 100
  },
//Tags
  tagContainerPending: {
    backgroundColor:'#99B0D7',
    borderRadius:3,
    color:'#091428',
    paddingVertical:2,
    paddingHorizontal:4,
    marginRight: 5,
    marginBottom: 8,
  },

  tagContainerRejected: {
    backgroundColor:'#F68CA2',
    borderRadius:3,
    color:'#f80031',
    paddingVertical:2,
    paddingHorizontal:4,
    marginRight: 5,
    marginBottom: 8,
  },
  
  tagContainerAccepted: {
    backgroundColor:'#c3f2fb',
    borderRadius:3,
    color:'#03acca',
    paddingVertical:2,
    paddingHorizontal:4,
    marginRight: 5,
    marginBottom: 8,
  },
  
})
