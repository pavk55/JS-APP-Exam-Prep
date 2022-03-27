import { navTemplate } from "./navTemplate";

let _router = undefined;
let _renderHandler = undefined;
let _authService = undefined;

function initialize(router, renderHandler, authService) {
  _router = router;
  _renderHandler = renderHandler;
  _authService = authService;
}

// async function submitHandler(doc) {
//   doc.preventDefault();
//   let formData = new FormData(doc.target)
//   let user = {
//     email: formData.get('email'),
//     password: formData.get('password'),
//   }
//   let loginResult = await _authService.login(user);
//   _router.redirect('/home');
// }

async function getView(context, next) {
  // let form = {
  //   submitHandler
  // }
  let templateResult = navTemplate();
  _renderHandler(templateResult);
  next();
}

export default {
  getView,
  initialize
}

