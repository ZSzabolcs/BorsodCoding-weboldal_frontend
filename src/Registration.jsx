function Registration() {
    return (
        <>
        <div class="container">
        <form  method="post" id="form">
            <input class="mb-3 form-control" type="text" name="userName"/><br/>
            <input class="mb-3 form-control" type="email" name="userEmail"/><br/>
            <input class="mb-3 form-control" type="password" name="userPassword"/>
            <button type="submit" class="btn btn-primary" id="gomb">Regisztráció</button>
            <a href="#" id="bejelentkezes">Már van fiókod?</a>
        </form>
    </div>
    <script src="regist.js"></script>
    </>
    )
}

export default Registration