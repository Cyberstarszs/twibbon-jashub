
import os, time, subprocess, sys, webbrowser

def slow(text):
    for i in text:
        print(i, end='', flush=True)
        time.sleep(0.01)
    print()

def banner():
    os.system('cls' if os.name == 'nt' else 'clear')
    print("\033[1;92m")
    print("╔════════════════════════════════════════╗")
    print("║          FOLLOW X.shybb breeee         ║")
    print("╚════════════════════════════════════════╝\033[0m")
    print("\033[1;90mBy Shohib | GitHub Automation\033[0m\n")

def push_to_repo(repo_url, message):
    subprocess.run(["git", "init"])
    subprocess.run(["git", "add", "."])
    subprocess.run(["git", "commit", "-m", message])
    subprocess.run(["git", "branch", "-M", "main"])
    subprocess.run(["git", "remote", "remove", "origin"], stderr=subprocess.DEVNULL)
    subprocess.run(["git", "remote", "add", "origin", repo_url])
    subprocess.run(["git", "push", "-u", "origin", "main"])
    slow("\nPush berhasil! Semua perubahan sudah dikirim.")

def menu():
    banner()
    print("\033[1;97m[1]\033[0m Push Original Code (murni code sendiri)")
    print("\033[1;97m[2]\033[0m Push Non-Original Code (hasil modifikasi/ambil dari orang lain)")
    print("\033[1;97m[3]\033[0m Keluar\n")

    choice = input("\033[1;96mPilih menu:\033[0m ")
    if choice == "1":
        os.system('cls' if os.name == 'nt' else 'clear')
        slow("\n=== PUSH ORIGINAL CODE ===")
        repo_url = input("\nMasukkan link repository GitHub kamu: ")
        message = input("Masukkan pesan commit: ")
        slow("\nSedang memproses push ke repository asli...")
        push_to_repo(repo_url, message)
    elif choice == "2":
        os.system('cls' if os.name == 'nt' else 'clear')
        slow("\n=== PUSH NON-ORIGINAL CODE ===")
        repo_url = input("\nMasukkan link repository GitHub baru: ")
        message = input("Masukkan pesan commit: ")
        slow("\nSedang menyiapkan push ke repository baru...")
        push_to_repo(repo_url, message)
    elif choice == "3":
        slow("\nTerima kasih sudah menggunakan tool ini.")
        sys.exit()
    else:
        slow("\nPilihan tidak valid.")
        time.sleep(1)
        menu()

if __name__ == "__main__":
    webbrowser.open("https://www.instagram.com/x.shybb?igsh=eWM0cGUwc2hycWR6")
    slow("Membuka Instagram X.shybb...")
    time.sleep(2)
    menu()
