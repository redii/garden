
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function (exports) {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.48.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/Content.svelte generated by Svelte v3.48.0 */

    const file$1 = "src/Content.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    // (43:0) {:else}
    function create_else_block(ctx) {
    	let div2;
    	let div0;
    	let h2;
    	let t1;
    	let p;

    	let t2_value = new Date(/*images*/ ctx[0][0].timestamp).toLocaleDateString("de-DE", {
    		year: "numeric",
    		month: "2-digit",
    		day: "2-digit",
    		hour: "2-digit",
    		minute: "2-digit"
    	}) + "";

    	let t2;
    	let t3;
    	let img;
    	let img_src_value;
    	let t4;
    	let div1;
    	let table;
    	let thead;
    	let tr;
    	let th0;
    	let t6;
    	let th1;
    	let t8;
    	let th2;
    	let t10;
    	let tbody;
    	let t11;
    	let nav;
    	let ul;
    	let li0;
    	let button0;
    	let span0;
    	let t13;
    	let li1;
    	let input;
    	let input_max_value;
    	let t14;
    	let li2;
    	let button1;
    	let span1;
    	let mounted;
    	let dispose;
    	let each_value = /*tableData*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "📸 Latest Image";
    			t1 = space();
    			p = element("p");
    			t2 = text(t2_value);
    			t3 = space();
    			img = element("img");
    			t4 = space();
    			div1 = element("div");
    			table = element("table");
    			thead = element("thead");
    			tr = element("tr");
    			th0 = element("th");
    			th0.textContent = "#";
    			t6 = space();
    			th1 = element("th");
    			th1.textContent = "Timestamp";
    			t8 = space();
    			th2 = element("th");
    			th2.textContent = "Image";
    			t10 = space();
    			tbody = element("tbody");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t11 = space();
    			nav = element("nav");
    			ul = element("ul");
    			li0 = element("li");
    			button0 = element("button");
    			span0 = element("span");
    			span0.textContent = "«";
    			t13 = space();
    			li1 = element("li");
    			input = element("input");
    			t14 = space();
    			li2 = element("li");
    			button1 = element("button");
    			span1 = element("span");
    			span1.textContent = "»";
    			add_location(h2, file$1, 45, 12, 1211);
    			add_location(p, file$1, 46, 12, 1248);
    			if (!src_url_equal(img.src, img_src_value = `/timelapse/image_${/*images*/ ctx[0][0].id}.jpg`)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Latest");
    			attr_dev(img, "class", "latest-image svelte-pafhem");
    			add_location(img, file$1, 55, 12, 1565);
    			attr_dev(div0, "class", "col-lg-6 mb-5");
    			add_location(div0, file$1, 44, 8, 1171);
    			attr_dev(th0, "scope", "col");
    			add_location(th0, file$1, 65, 24, 1865);
    			attr_dev(th1, "scope", "col");
    			add_location(th1, file$1, 66, 24, 1912);
    			attr_dev(th2, "scope", "col");
    			add_location(th2, file$1, 67, 24, 1967);
    			add_location(tr, file$1, 64, 20, 1836);
    			add_location(thead, file$1, 63, 16, 1808);
    			add_location(tbody, file$1, 70, 16, 2061);
    			attr_dev(table, "class", "table svelte-pafhem");
    			add_location(table, file$1, 62, 12, 1770);
    			attr_dev(span0, "aria-hidden", "true");
    			add_location(span0, file$1, 108, 28, 3693);
    			attr_dev(button0, "class", "page-link");
    			attr_dev(button0, "href", "#");
    			attr_dev(button0, "aria-label", "Previous");
    			add_location(button0, file$1, 102, 24, 3423);
    			attr_dev(li0, "class", "page-item");
    			add_location(li0, file$1, 101, 20, 3376);
    			attr_dev(input, "class", "pagination-input svelte-pafhem");
    			attr_dev(input, "type", "number");
    			attr_dev(input, "name", "page");
    			attr_dev(input, "min", 1);
    			attr_dev(input, "max", input_max_value = Math.ceil(/*images*/ ctx[0].length / /*pageSize*/ ctx[1]));
    			add_location(input, file$1, 112, 24, 3860);
    			attr_dev(li1, "class", "page-item");
    			add_location(li1, file$1, 111, 20, 3813);
    			attr_dev(span1, "aria-hidden", "true");
    			add_location(span1, file$1, 128, 28, 4546);
    			attr_dev(button1, "class", "page-link");
    			attr_dev(button1, "href", "#");
    			attr_dev(button1, "aria-label", "Next");
    			add_location(button1, file$1, 122, 24, 4280);
    			attr_dev(li2, "class", "page-item");
    			add_location(li2, file$1, 121, 20, 4233);
    			attr_dev(ul, "class", "pagination");
    			add_location(ul, file$1, 100, 16, 3332);
    			add_location(nav, file$1, 99, 12, 3310);
    			attr_dev(div1, "class", "col-lg-6");
    			add_location(div1, file$1, 61, 8, 1735);
    			attr_dev(div2, "class", "row");
    			add_location(div2, file$1, 43, 4, 1145);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, h2);
    			append_dev(div0, t1);
    			append_dev(div0, p);
    			append_dev(p, t2);
    			append_dev(div0, t3);
    			append_dev(div0, img);
    			append_dev(div2, t4);
    			append_dev(div2, div1);
    			append_dev(div1, table);
    			append_dev(table, thead);
    			append_dev(thead, tr);
    			append_dev(tr, th0);
    			append_dev(tr, t6);
    			append_dev(tr, th1);
    			append_dev(tr, t8);
    			append_dev(tr, th2);
    			append_dev(table, t10);
    			append_dev(table, tbody);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tbody, null);
    			}

    			append_dev(div1, t11);
    			append_dev(div1, nav);
    			append_dev(nav, ul);
    			append_dev(ul, li0);
    			append_dev(li0, button0);
    			append_dev(button0, span0);
    			append_dev(ul, t13);
    			append_dev(ul, li1);
    			append_dev(li1, input);
    			set_input_value(input, /*pageNumber*/ ctx[2]);
    			append_dev(ul, t14);
    			append_dev(ul, li2);
    			append_dev(li2, button1);
    			append_dev(button1, span1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[4], false, false, false),
    					listen_dev(input, "input", /*input_input_handler*/ ctx[5]),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[6], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*images*/ 1 && t2_value !== (t2_value = new Date(/*images*/ ctx[0][0].timestamp).toLocaleDateString("de-DE", {
    				year: "numeric",
    				month: "2-digit",
    				day: "2-digit",
    				hour: "2-digit",
    				minute: "2-digit"
    			}) + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*images*/ 1 && !src_url_equal(img.src, img_src_value = `/timelapse/image_${/*images*/ ctx[0][0].id}.jpg`)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*tableData, Date*/ 8) {
    				each_value = /*tableData*/ ctx[3];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(tbody, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*images, pageSize*/ 3 && input_max_value !== (input_max_value = Math.ceil(/*images*/ ctx[0].length / /*pageSize*/ ctx[1]))) {
    				attr_dev(input, "max", input_max_value);
    			}

    			if (dirty & /*pageNumber*/ 4 && to_number(input.value) !== /*pageNumber*/ ctx[2]) {
    				set_input_value(input, /*pageNumber*/ ctx[2]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(43:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (37:0) {#if !images.length}
    function create_if_block(ctx) {
    	let div1;
    	let div0;
    	let h2;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "No image taken yet... 👀";
    			add_location(h2, file$1, 39, 12, 1073);
    			attr_dev(div0, "class", "col");
    			add_location(div0, file$1, 38, 8, 1043);
    			attr_dev(div1, "class", "row");
    			add_location(div1, file$1, 37, 4, 1017);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(37:0) {#if !images.length}",
    		ctx
    	});

    	return block;
    }

    // (72:20) {#each tableData as image}
    function create_each_block(ctx) {
    	let tr;
    	let th;
    	let t0_value = /*image*/ ctx[7].id + "";
    	let t0;
    	let t1;
    	let td0;

    	let t2_value = new Date(/*image*/ ctx[7].timestamp).toLocaleDateString("de-DE", {
    		year: "numeric",
    		month: "2-digit",
    		day: "2-digit",
    		hour: "2-digit",
    		minute: "2-digit"
    	}) + "";

    	let t2;
    	let t3;
    	let td1;
    	let a;
    	let t4;
    	let a_href_value;
    	let a_alt_value;
    	let t5;

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			th = element("th");
    			t0 = text(t0_value);
    			t1 = space();
    			td0 = element("td");
    			t2 = text(t2_value);
    			t3 = space();
    			td1 = element("td");
    			a = element("a");
    			t4 = text("➡️");
    			t5 = space();
    			attr_dev(th, "scope", "row");
    			add_location(th, file$1, 73, 28, 2173);
    			add_location(td0, file$1, 74, 28, 2233);
    			attr_dev(a, "href", a_href_value = `/timelapse/image_${/*image*/ ctx[7].id}.jpg`);
    			attr_dev(a, "alt", a_alt_value = /*image*/ ctx[7].timestamp);
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "class", "svelte-pafhem");
    			add_location(a, file$1, 87, 32, 2859);
    			add_location(td1, file$1, 86, 28, 2822);
    			add_location(tr, file$1, 72, 24, 2140);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, th);
    			append_dev(th, t0);
    			append_dev(tr, t1);
    			append_dev(tr, td0);
    			append_dev(td0, t2);
    			append_dev(tr, t3);
    			append_dev(tr, td1);
    			append_dev(td1, a);
    			append_dev(a, t4);
    			append_dev(tr, t5);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*tableData*/ 8 && t0_value !== (t0_value = /*image*/ ctx[7].id + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*tableData*/ 8 && t2_value !== (t2_value = new Date(/*image*/ ctx[7].timestamp).toLocaleDateString("de-DE", {
    				year: "numeric",
    				month: "2-digit",
    				day: "2-digit",
    				hour: "2-digit",
    				minute: "2-digit"
    			}) + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*tableData*/ 8 && a_href_value !== (a_href_value = `/timelapse/image_${/*image*/ ctx[7].id}.jpg`)) {
    				attr_dev(a, "href", a_href_value);
    			}

    			if (dirty & /*tableData*/ 8 && a_alt_value !== (a_alt_value = /*image*/ ctx[7].timestamp)) {
    				attr_dev(a, "alt", a_alt_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(72:20) {#each tableData as image}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div2;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let div1;
    	let h1;
    	let t2;
    	let p0;
    	let t3;
    	let a0;
    	let t5;
    	let t6;
    	let p1;
    	let t7;
    	let b;
    	let t9;
    	let t10;
    	let p2;
    	let t11;
    	let a1;
    	let t13;
    	let t14;
    	let hr;
    	let t15;
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (!/*images*/ ctx[0].length) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			div1 = element("div");
    			h1 = element("h1");
    			h1.textContent = "My Garden";
    			t2 = space();
    			p0 = element("p");
    			t3 = text("Saw ");
    			a0 = element("a");
    			a0.textContent = "this";
    			t5 = text("\n            post on reddit and wanted to do it myself.");
    			t6 = space();
    			p1 = element("p");
    			t7 = text("But since my garding skills and reliability when it comes to plants\n            are about ");
    			b = element("b");
    			b.textContent = "zero";
    			t9 = text(", I wanted to automate that process.");
    			t10 = space();
    			p2 = element("p");
    			t11 = text("Read more about my garden project on\n            ");
    			a1 = element("a");
    			a1.textContent = "Github";
    			t13 = text(".");
    			t14 = space();
    			hr = element("hr");
    			t15 = space();
    			if_block.c();
    			if_block_anchor = empty();
    			if (!src_url_equal(img.src, img_src_value = "https://raw.githubusercontent.com/redii/garden/main/assets/logo.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "My Garden Logo");
    			attr_dev(img, "class", "garden-logo svelte-pafhem");
    			add_location(img, file$1, 13, 8, 264);
    			attr_dev(div0, "class", "col-md-3 text-center");
    			add_location(div0, file$1, 12, 4, 221);
    			add_location(h1, file$1, 20, 8, 477);
    			attr_dev(a0, "href", "https://redd.it/vkuhvk");
    			add_location(a0, file$1, 22, 16, 524);
    			add_location(p0, file$1, 21, 8, 504);
    			add_location(b, file$1, 27, 22, 748);
    			add_location(p1, file$1, 25, 8, 642);
    			attr_dev(a1, "href", "https://github.com/redii/garden");
    			add_location(a1, file$1, 31, 12, 882);
    			add_location(p2, file$1, 29, 8, 817);
    			attr_dev(div1, "class", "col-md-9");
    			add_location(div1, file$1, 19, 4, 446);
    			attr_dev(div2, "class", "row");
    			add_location(div2, file$1, 11, 0, 199);
    			attr_dev(hr, "class", "mt-5 mb-5");
    			add_location(hr, file$1, 35, 0, 967);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, img);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, h1);
    			append_dev(div1, t2);
    			append_dev(div1, p0);
    			append_dev(p0, t3);
    			append_dev(p0, a0);
    			append_dev(p0, t5);
    			append_dev(div1, t6);
    			append_dev(div1, p1);
    			append_dev(p1, t7);
    			append_dev(p1, b);
    			append_dev(p1, t9);
    			append_dev(div1, t10);
    			append_dev(div1, p2);
    			append_dev(p2, t11);
    			append_dev(p2, a1);
    			append_dev(p2, t13);
    			insert_dev(target, t14, anchor);
    			insert_dev(target, hr, anchor);
    			insert_dev(target, t15, anchor);
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(hr);
    			if (detaching) detach_dev(t15);
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let pageNumber;
    	let tableData;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Content', slots, []);
    	let { images = [], pageSize = 10 } = $$props;
    	const writable_props = ['images', 'pageSize'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Content> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => $$invalidate(2, pageNumber = pageNumber - 1);

    	function input_input_handler() {
    		pageNumber = to_number(this.value);
    		$$invalidate(2, pageNumber);
    	}

    	const click_handler_1 = () => $$invalidate(2, pageNumber = pageNumber + 1);

    	$$self.$$set = $$props => {
    		if ('images' in $$props) $$invalidate(0, images = $$props.images);
    		if ('pageSize' in $$props) $$invalidate(1, pageSize = $$props.pageSize);
    	};

    	$$self.$capture_state = () => ({ images, pageSize, pageNumber, tableData });

    	$$self.$inject_state = $$props => {
    		if ('images' in $$props) $$invalidate(0, images = $$props.images);
    		if ('pageSize' in $$props) $$invalidate(1, pageSize = $$props.pageSize);
    		if ('pageNumber' in $$props) $$invalidate(2, pageNumber = $$props.pageNumber);
    		if ('tableData' in $$props) $$invalidate(3, tableData = $$props.tableData);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*images, pageNumber, pageSize*/ 7) {
    			$$invalidate(3, tableData = images.slice((pageNumber - 1) * pageSize, pageNumber * pageSize));
    		}
    	};

    	$$invalidate(2, pageNumber = 1);

    	return [
    		images,
    		pageSize,
    		pageNumber,
    		tableData,
    		click_handler,
    		input_input_handler,
    		click_handler_1
    	];
    }

    class Content extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { images: 0, pageSize: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Content",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get images() {
    		throw new Error("<Content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set images(value) {
    		throw new Error("<Content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pageSize() {
    		throw new Error("<Content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pageSize(value) {
    		throw new Error("<Content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.48.0 */
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let a;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let div1;
    	let content;
    	let t1;
    	let footer;
    	let t2;
    	let span;
    	let current;
    	content = new Content({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			a = element("a");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			div1 = element("div");
    			create_component(content.$$.fragment);
    			t1 = space();
    			footer = element("footer");
    			t2 = text("made with ");
    			span = element("span");
    			span.textContent = "❤️";
    			if (!src_url_equal(img.src, img_src_value = "https://raw.githubusercontent.com/redii/garden/main/assets/github.jpeg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Github Logo");
    			attr_dev(img, "class", "svelte-1mutf4c");
    			add_location(img, file, 7, 12, 185);
    			attr_dev(div0, "class", "github-badge svelte-1mutf4c");
    			add_location(div0, file, 6, 8, 146);
    			attr_dev(a, "href", "https://github.com/redii/garden");
    			attr_dev(a, "alt", "Github Project");
    			add_location(a, file, 5, 4, 74);
    			attr_dev(div1, "class", "container");
    			add_location(div1, file, 13, 4, 360);
    			attr_dev(main, "class", "svelte-1mutf4c");
    			add_location(main, file, 4, 0, 63);
    			attr_dev(span, "class", "emoji svelte-1mutf4c");
    			add_location(span, file, 18, 14, 466);
    			attr_dev(footer, "class", "text-center svelte-1mutf4c");
    			add_location(footer, file, 17, 0, 423);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, a);
    			append_dev(a, div0);
    			append_dev(div0, img);
    			append_dev(main, t0);
    			append_dev(main, div1);
    			mount_component(content, div1, null);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, footer, anchor);
    			append_dev(footer, t2);
    			append_dev(footer, span);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(content.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(content.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(content);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Content });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.getElementById("content"),
    });

    exports.app = app;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=bundle.js.map
