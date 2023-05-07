# Ethernaut Solution
Solution to the [Ethernaut](https://ethernaut.openzeppelin.com/) wargame. Solutions are written as hardhat tests under `test/solution`. Contracts used in the solutions are under `contracts/solution`.

# How to use
1. Make sure you have `git`, `node` and `yarn`
2. Clone the repo with submodules: `git clone --recurse-submodules git@github.com:14mbda/ethernaut-solution.git`
3. `cd ethernaut-solution && yarn`
4. Add your `.env` file following `.env.template`'s format. 
    - You will need URL to a Sepolia testnet node with archive to fork a local network, which you can get for free from [Alchemy](https://www.alchemy.com/)(sign-up needed)
5. Play with the solutions, or clear the existing ones and make your own by running `yarn clear_solution`.
