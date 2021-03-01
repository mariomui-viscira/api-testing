import { Router } from 'express'

const router = Router()

router
  .route('/')
  .get((req, res) => {
    res.status(200).send({ message: 'gotted"' })
  })
  .post((req, res) => {
    res.status(202).send({ message: 'postAccepted' })
    /*
    it should be an options request that gives a 200 status code, which then 
    triggers this post request. so the optiosn will give a jwt token and when we 
    post, we send the post body with the jwt token to authenticate on the server.
    this would probably be just a standard global jwt token just to make sure that our servers
    our up. Another token regarding what to useraccount to post to would be in the token that
    was generated during login.
    
    6.5.3. 403 Forbidden
    The 403 (Forbidden) status code indicates that the server understood the request but refuses to authorize it. A server that wishes to make public why the request has been forbidden can describe that reason in the response payload (if any). [...]
    6.5.8. 409 Conflict
    The 409 (Conflict) status code indicates that the request could not be completed due to a conflict with the current state of the target resource. This code is used in situations where the user might be able to resolve the conflict and resubmit the request. The server SHOULD generate a payload that includes enough information for a user to recognize the source of the conflict. [...]
    */
  })

router
  .route('/:id')
  .get((req, res) => {
    res.status(200).send({ getParams: req.params.id })
  })
  .delete((req, res) => {
    res.status(202).send({ deleteAccepted: req.params.id })
    // if not 204.
    /* 
    202: The request has been accepted for processing, but the processing has not been completed.
    204: The server has successfully fulfilled the request and that there is no additional content to send in the response payload body.
    200: The request has succeeded and the request payload includes a representation of the status of the action.
    */
  })
  .put((req, res) => {
    res.status(200).send({ created: req.params.id })
    /*
    HTTP status code 200 OK for a successful PUT of an update to an existing resource. No response body needed. (Per Section 9.6, 204 No Content is even more appropriate.)
    HTTP status code 201 Created for a successful PUT of a new resource, with the most specific URI for the new resource returned in the Location header field and any other relevant URIs and metadata of the resource echoed in the response body. (RFC 2616 Section 10.2.2)
    HTTP status code 409 Conflict for a PUT that is unsuccessful due to a 3rd-party modification, with a list of differences between the attempted update and the current resource in the response body. (RFC 2616 Section 10.4.10)
    HTTP status code 400 Bad Request for an unsuccessful PUT, with natural-language text (such as English) in the response body that explains why the PUT failed. (RFC 2616 Section 10.4)
    */
  })
export default router
