import * as ng from 'angular'
import * as Atomic from '@/atomic-components'

import '@/main.scss'


const app = ng.module('test', [])
app.component('atom', new Atomic.AtomComponent())