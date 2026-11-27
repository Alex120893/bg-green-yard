import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function load(path, dependencies = {}) {
  const code = ts.transpileModule(readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, require: (name) => {
    assert.ok(name in dependencies, `Unexpected dependency: ${name}`);
    return dependencies[name];
  }, console });
  return exports;
}
const services = load('lib/contact-services.ts');
assert.equal(services.isContactService('lighting'), true);
assert.equal(services.isContactService('invalid'), false);
const messages = load('lib/i18n.ts');
assert.equal(messages.getMessages('bg').serviceOptions.lighting, 'Градинско осветление');
assert.equal(messages.getMessages('en').serviceOptions.lighting, 'Garden lighting');
let received;
const route = load('app/api/contact/route.ts', {
  'next/server': { NextResponse: { json: (body, options) => ({ body, status: options?.status ?? 200 }) } },
  '@/lib/email': { sendContactEmail: async (payload) => { received = payload; } },
  '@/lib/contact-services': services,
});
const payload = { name: 'Test', email: 'test@example.com', phone: '123456789', service: 'lighting', serviceLabel: 'Градинско осветление', locale: 'bg' };
assert.equal((await route.POST({ json: async () => payload })).status, 200);
assert.equal(received.service, 'lighting');
assert.equal(received.serviceLabel, payload.serviceLabel);
received = undefined;
assert.equal((await route.POST({ json: async () => ({ ...payload, service: 'invalid' }) })).status, 400);
assert.equal(received, undefined);
console.log('Contact services: BG/EN lighting labels, shared values, accepted lighting payload and invalid-service rejection passed (email mocked; no real message sent).');
