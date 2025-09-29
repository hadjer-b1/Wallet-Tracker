# 💰 Wallet Tracker

A modern, responsive personal finance management application built with React. Track your income, expenses, and visualize your financial data with beautiful charts and analytics.

## 🌟 Features

- **💸 Expense Management**: Add, categorize, and track your daily expenses
- **💰 Income Tracking**: Monitor your income sources and amounts
- **📊 Interactive Charts**: Visualize your financial data with recharts
- **📈 Statistics Dashboard**: Get insights into your spending patterns
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🌍 Multi-language Support**: Available in multiple languages
- **📁 File Upload**: Import financial data from files
- **🎨 Material-UI Design**: Modern and intuitive user interface

## 🚀 Live Demo

Visit the live application: [https://hadjer-b1.github.io/Wallet-Tracker](https://hadjer-b1.github.io/Wallet-Tracker)

## 🛠️ Technologies Used

- **Frontend**: React 18, React Router DOM
- **UI Library**: Material-UI (MUI)
- **Charts**: Recharts
- **Styling**: CSS3, Material-UI theming
- **Internationalization**: Custom i18n implementation
- **Build Tool**: Create React App
- **Deployment**: GitHub Pages

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hadjer-b1/Wallet-Tracker.git
   cd Wallet-Tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ExpenseForm.jsx  # Form for adding expenses
│   ├── ExpenseList.jsx  # Display list of expenses
│   ├── IncomeForm.jsx   # Form for adding income
│   ├── IncomeList.jsx   # Display list of income
│   ├── NavBar.jsx       # Navigation component
│   └── FileUploader.jsx # File upload component
├── pages/              # Main application pages
│   ├── Home.jsx        # Dashboard/Home page
│   ├── AddExpense.jsx  # Add expense page
│   ├── Statistics.jsx  # Analytics and charts
│   └── Investments.jsx # Investment tracking
├── context/            # React Context for state management
│   └── AppContext.js   # Global application state
├── operations/         # Business logic
│   └── analytics.js    # Data processing and analytics
├── assets/            # Static assets
└── data.js           # Sample/mock data
```

## 🔧 Available Scripts

### Development
- **`npm start`** - Runs the app in development mode
- **`npm test`** - Launches the test runner
- **`npm run build`** - Builds the app for production

### Deployment
- **`npm run deploy`** - Deploys the app to GitHub Pages
- **`npm run predeploy`** - Automatically runs before deploy (builds the app)

## 📊 Features Overview

### Dashboard
- Overview of total income and expenses
- Recent transactions
- Quick action buttons
- Financial summary cards

### Expense Management
- Add new expenses with categories
- View and manage expense history
- Category-wise expense tracking
- Date-based filtering

### Income Tracking
- Record various income sources
- Track income trends
- Monthly/yearly summaries

### Analytics & Statistics
- Interactive charts and graphs
- Spending pattern analysis
- Category-wise breakdowns
- Financial insights and trends

## 🌐 Multi-language Support

The application supports multiple languages through a custom internationalization system. Language files are managed in the `i18n.js` configuration.

## 🚀 Deployment

This project is automatically deployed to GitHub Pages. To deploy your own version:

1. Fork this repository
2. Update the `homepage` field in `package.json` with your GitHub Pages URL
3. Run `npm run deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Hadjer B1**
- GitHub: [@hadjer-b1](https://github.com/hadjer-b1)

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- UI components from [Material-UI](https://mui.com/)
- Charts powered by [Recharts](https://recharts.org/)

---

⭐ If you found this project helpful, please give it a star on GitHub!
