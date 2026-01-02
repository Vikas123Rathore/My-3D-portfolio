// import mongoose from 'mongoose'
// import dotenv from 'dotenv'
// import { User } from './models/userSchema.js'

// dotenv.config({ path: './.env' })

// const seedAdmin = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       dbName: 'PORTFOLIO_INDRAJEET',
//       serverSelectionTimeoutMS: 20000,
//     })
//     console.log('✅ Database Connected...')

//     const existingUser = await User.findOne({
//       email: 'Your_email_id for admin login',
//     })
//     if (existingUser) {
//       console.log('⚠️ Admin already exists!')
//       process.exit()
//     }

//     await User.create({
//       fullName: 'Vikas Rathore',
//       email: 'admin@gmail.com',
//       password: 'Admin@123',
//       phone: '+916397722144',
//       aboutMe: 'Full Stack Developer',
//       // portfolioURL: 'https://your-portfolio.com'
//       avatar: { public_id: 'dummy', url: 'https://placehold.co/400' },
//       resume: { public_id: 'dummy', url: 'https://placehold.co/400' },
//     })
//     console.log('🎉 Admin Created! Login now.')
//   } catch (error) {
//     console.log('❌ Error:', error.message)
//   }
// }
// seedAdmin()
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { User } from './models/userSchema.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '.env') })

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'PORTFOLIO_INDRAJEET',
      serverSelectionTimeoutMS: 20000,
    })
    console.log('✅ Database Connected...')

    const existingUser = await User.findOne({ email: 'admin@gmail.com' })
    if (existingUser) {
      console.log('⚠️ Admin already exists!')
      process.exit()
    }

    await User.create({
      fullName: 'Vikas Rathore',
      email: 'admin@gmail.com',
      password: 'Admin@123',
      phone: '+916397722144',
      aboutMe: 'Full Stack Developer',
      portfolioURL: 'https://vikasrathore.dev',
      avatar: { public_id: 'dummy', url: 'https://placehold.co/400' },
      resume: { public_id: 'dummy', url: 'https://placehold.co/400' },
    })

    console.log('🎉 Admin Created! Login now.')
    process.exit()
  } catch (error) {
    console.log('❌ Error:', error.message)
    process.exit(1)
  }
}

seedAdmin()
