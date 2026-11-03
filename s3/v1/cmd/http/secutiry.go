package main

import "net/http"

// Helper for authentication check (Header or Cookie)
func isAuthorizedRequest(r *http.Request) bool {
	headerToken := r.Header.Get(cfg.AccessTokenHeader)
	cookieToken := ""
	if cookie, err := r.Cookie("accessToken"); err == nil {
		cookieToken = cookie.Value
	}
	return (headerToken != "" && headerToken == cfg.SecretAccessToken) || (cookieToken != "" && cookieToken == cfg.SecretAccessToken)
}
