import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs'
import * as path from 'path'

@Injectable()
export class LoggerService extends ConsoleLogger {
    async logToFile(entry) {
        const formattedEntry = `${Intl.DateTimeFormat('en-US', {
            timeStyle: 'short',
            dateStyle: 'short',
            timeZone: 'America/Chicago'
        }).format(new Date())}\t${entry}\n`

        try {
            if(!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
                await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'))
            }
            await fsPromises.appendFile(path.join(__dirname, '..', '..', 'logs', 'myLoggerFile.log'), formattedEntry)
        } catch (error) {
            if(error instanceof Error) console.log(error.message)
        }
    }

    log(message: string, context?: string) {
        const entry = `${context}\t${message}`
        this.logToFile(entry).catch(e => console.log('Fail to log to file', e))
        super.log(message, context)
    }

    error(message: string, context?: string) {
        const entry = `${context}\t${message}`
        this.logToFile(entry).catch(e => console.log('Fail to log to file', e))
        super.error(message, context)
    }
}
