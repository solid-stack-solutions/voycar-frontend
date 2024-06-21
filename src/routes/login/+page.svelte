<div class="flex flex-col justify-center items-center mt-4">
    <h1 class="h2 mb-8">Bei Voycar anmelden</h1>
    <div class="w-96 justify-center items-center space-y-4">
        <form class="p-4 border-2 rounded-md border-secondary-500 space-y-3">
            <!-- Email field -->
                <label class="label" for="email_input">
                    <span>Email</span>
                </label>
            <input class="input" type="text" id="email_input" placeholder="beispiel.organisation@mail.com"/>
            <!-- Password field -->
            <label class="label" for="password_input">
                <span>Passwort</span>
            </label>
            <input class="input" type="password" id="password_input" placeholder="Dein super sicheres Passwort 😉"/>
            <div class="flex flex-col items-center">
                <button class="btn variant-filled-primary w-full">Anmelden</button>
            </div>
            <div class="flex justify-center items-center">
                <a class="text-sm text-tertiary-600" href="/forgotPassword">Passwort vergessen?</a>
            </div>
        </form>
        <div class="flex flex-col-2 items-center justify-between border-2 rounded-md border-secondary-500 p-4">
            <p>Neu bei Voycar?</p>
            <a class="text-tertiary-500" href="/register">Neuen Account erstellen</a>
        </div>
    </div>
</div>