import { homeTemplate } from "./homeTemplate";

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

async function getView(context) {
  // let form = {
  //   submitHandler
  // }
  let templateResult = homeTemplate();
  _renderHandler(templateResult);
}

export default {
  getView,
  initialize
}

